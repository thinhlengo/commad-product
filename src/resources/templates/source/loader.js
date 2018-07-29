const fs = require('fs');
let moduleName = process.env.MODULE_NAME;

if (moduleName) {
    moduleName = moduleName.trim();
    let camelName = moduleName.substr(0, 1).toLowerCase() + moduleName.substr(1);
    let pascalName = moduleName.substr(0, 1).toUpperCase() + moduleName.substr(1);

    let entityPath = `./src/app/entity/${pascalName}Entity.ts`;
    let entity = getFileContent(`${__dirname}/entity.tmp`, camelName, pascalName);

    let repositoryPath = `./src/app/repository/${pascalName}Repository.ts`;
    let repository = getFileContent(`${__dirname}/repository.tmp`, camelName, pascalName);

    let businessPath = `./src/app/business/${pascalName}Business.ts`;
    let business = getFileContent(`${__dirname}/business.tmp`, camelName, pascalName);

    // let businessInterfacePath = `${__dirname}/../../../../../../src/app/business/interfaces/I${pascalName}Business.js`;
    // let businessInterface = getFileContent(`${__dirname}/businessInterface.tmp`, camelName, pascalName);

    let controllerPath = `./src/controllers/${pascalName}Controller.ts`;
    let controller = getFileContent(`${__dirname}/controller.tmp`, camelName, pascalName);

    fs.writeFileSync(repositoryPath, repository);
    fs.writeFileSync(businessPath, business);
    fs.writeFileSync(controllerPath, controller);
    fs.writeFileSync(entityPath, entity);
}

function getFileContent(path, camelName, pascalName) {
    return fs.readFileSync(path, 'utf8').replace(new RegExp('{camelName}', 'g'), camelName).replace(new RegExp('{pascalName}', 'g'), pascalName);
}
