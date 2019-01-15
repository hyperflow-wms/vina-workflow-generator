var fs = require('fs');

function createConfig(receptor, ligand) {
    let receptor_line = "receptor = " + receptor;
    let ligand_line = "ligand = " + ligand;
    let ligand_receptor_name = receptor.toString().split(".")[0] + "_" + ligand.toString().split(".")[0];
    let output_line = "out = " + ligand_receptor_name + ".pdbqt";

    let parameters = fs.readFileSync("parameters.txt", 'utf8');
    let config = receptor_line + '\n' + ligand_line + '\n' + parameters + '\n' + output_line;
    let file_path = "config_" + ligand_receptor_name;

    console.log("Saving file " + file_path);

    fs.writeFile(file_path, config, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

receptor = process.argv[process.argv.length - 2];
ligand = process.argv[process.argv.length - 1];

createConfig(receptor, ligand);