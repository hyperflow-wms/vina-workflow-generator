const argv = require("optimist").argv;
const fs = require("fs");

function createTask(name, functionName, executable, args, ins, outs) {
    return {
        "name": name,
        "function": functionName,
        "type": "dataflow",
        "config": {
            "executor": {
                "executable": executable,
                "args": args
            }
        },
        "ins": ins,
        "outs": outs
    }
}

function createWf(receptor_path, lig_path) {

    const function_name = "RESTServiceCommand";
    const wrapper_program = "wrapper.js";
    const vina_program = "vina";
    const split_program = "vina_split";

    // main tuple
    const wfOut = {
        processes: [],
        signals: [],
        ins: [],
        outs: []
    };

    let ins = 0;

    wfOut.signals.push({
        name: "parameters.txt",
    });
    wfOut.ins.push(ins++);

    const rec_files = fs.readdirSync(receptor_path);

    rec_files.forEach(function (receptor) {
        wfOut.signals.push({
            name: receptor,
        });
        wfOut.ins.push(ins++);
    });

    const lig_files = fs.readdirSync(lig_path);

    lig_files.forEach(function (lig) {
        wfOut.signals.push({
            name: lig,
        });
        wfOut.ins.push(ins++);
    });

    rec_files.forEach(function (receptor) {
        lig_files.forEach(function (ligand) {

            const config_name = "config_" + receptor.split(".")[0] + "_" + ligand.split(".")[0];

            wfOut.signals.push({
                name: config_name,
            });

            const output_name = receptor.split(".")[0] + "_" + ligand.split(".")[0] + ".pdbqt";

            wfOut.signals.push({
                name: output_name,
            });
            ins += 2;

            let split_outs = [];
            for (let i = 1; i < 10; i++) {
                const split_out_name = receptor.split(".")[0] + "_" + ligand.split(".")[0] + "_ligand_" + i + ".pdbqt";
                wfOut.signals.push({
                    name: split_out_name,
                });
                split_outs.push(split_out_name);
                wfOut.outs.push(ins++);
            }

            wfOut.processes.push(createTask("wrapper",
                function_name, wrapper_program, [receptor, ligand], ["parameters.txt"], [config_name]));
            wfOut.processes.push(createTask("vina",
                function_name, vina_program, ["--config", config_name], [receptor, ligand, config_name], [output_name]));
            wfOut.processes.push(createTask("split",
                function_name, split_program, ["--input", output_name], [output_name], split_outs));
        });
    });

    fs.writeFile("workflow.json", JSON.stringify(wfOut, null, 2), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The workflow was saved!");
    });
}

// main function
if(argv._.length === 2) {
    createWf(argv._[0], argv._[1]);
} else {
    console.log("Error - not enough args");
    console.log("Running: node generator.ja path_to_receptors path_to_ligands")
}
