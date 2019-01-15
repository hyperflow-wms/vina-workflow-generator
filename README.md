# Vina Workflow
Generator for vina workflow.

## Generating workflow

Execute generator.js with proper arguments - path to folder with receptors and ligands.

```
node generator.js example/receptors example/ligands
```

## Running workflow
Generated workflow can be runned on AWS lambda using Hyperflow (https://github.com/hyperflow-wms/hyperflow) and REST handler (https://github.com/burkat/hyperflow-awslambda-executor).
Input files can be found in this repository; vina and vina_split binaries, wrapper.js and parameters.txt. They should be uploaded to S3 before running workflow.

## Vina input files
More ligands and receptor files can be found on http://zinc.docking.org/pdbqt/.
