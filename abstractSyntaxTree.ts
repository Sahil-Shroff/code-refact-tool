import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const findImports = (code) => {
    const ast = parse(code, { sourceType: "module" });
    let imports = [];

    traverse(ast, {
      ImportDeclaration(path) {
        imports.push(path.node.source.value);
      },
    });

    return [...imports];
}

const findFunctions = (code) => {
    console.log(code);
    
    const ast = parse(code, { sourceType: "module" });
    let refernces = [];

    traverse(ast, {
      ImportDeclaration(path) {
        refernces.push(path.scope.references);
      },
    });

    return [...refernces];
}

export { findFunctions, findImports };