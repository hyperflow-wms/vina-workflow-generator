# AutoDock Vina Workflow
Generator for vina workflow.

http://vina.scripps.edu/

## Generating example workflow

git clone https://github.com/burkat/vina-workflow-generator.git

cd vina-workflow-generator/

npm install

node generator.js example/receptors example/ligands

The parameters are path to receptors folder and ligands folder.
A workflow.json file will be saved in current folder.

## Running workflow
Generated workflow can be runned on AWS lambda using Hyperflow (https://github.com/hyperflow-wms/hyperflow) and REST handler (https://github.com/burkat/hyperflow-awslambda-executor).

Input files can be found in this repository; vina and vina_split binaries, wrapper.js and parameters.txt. They should be uploaded to S3 before running workflow and also the prefix and bucket should be set in hyperflow executor's config.

## AutoDock Vina input files
More ligands and receptor files can be found on http://zinc.docking.org/

Example: http://zinc.docking.org/substances/ZINC000000000179/protomers/table.html

Not all of them contains pdbqt version, in order to convert into pdbqt one can download '.mol2.gz' representation as seen here: http://zinc.docking.org/protomers/563211156/

Install 'OpenBabel' e.g. installing it through Anaconda: https://anaconda.org/openbabel/openbabel

Extract mol2 files `gunzip fileName.mol2.gz` and convert using 'OpenBabel': `obabel -i mol2 nameOfTheFile.mol2 -o pdbqt -O outputFile.pdbqt`
