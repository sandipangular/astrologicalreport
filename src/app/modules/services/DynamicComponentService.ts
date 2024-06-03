// import { Injectable } from '@angular/core';
// import { execSync } from 'child_process';
// // import * as fs from 'fs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DynamicComponentService {

//   constructor() { }

//   createComponentInFolder(folderName: string, componentName: string) {
//     // Generate component using Angular CLI command
//     alert(folderName)
//     alert(componentName)
//     execSync(`ng generate component ${folderName}/${componentName}`);

//     // Alternatively, create the component file manually using filesystem
//     //const componentContent = `import { Component } from '@angular/core'; @Component({ selector: '${componentName}', template: '<p>${componentName} component works!</p>' }) export class ${componentName}Component {}`;
//   //  fs.writeFileSync(`${folderName}/${componentName}.component.ts`, componentContent);
//   }
// }



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor() { }

  createComponentInFolder(folderName: string, componentName: string) {
    alert(folderName)
    alert(componentName)
    if (typeof window === 'undefined') {
      // Server-side code
      const { execSync } = require('child_process');
      // Use execSync here
    } else {
      // Client-side code
      console.error('Cannot execute child_process.execSync in the browser environment');
    }
  }

  // async createComponentInFolder(folderName: string, componentName: string) {
  //   // Generate component using Angular CLI command
  //   try {
  //     execSync(`ng generate component ${folderName}/${componentName}`, { stdio: 'inherit' });
  //   } catch (error) {
  //     console.error('Error generating component:', error);
  //   }

  //   // Alternatively, create the component file manually using filesystem
  //   const componentContent = `import { Component } from '@angular/core'; 
  //   @Component({ 
  //     selector: '${componentName}', 
  //     template: '<p>${componentName} component works!</p>' 
  //   }) 
  //   export class ${componentName}Component {}`;
    
  //   try {
  //     await writeFile(`${folderName}/${componentName}.component.ts`, componentContent);
  //   } catch (error) {
  //     console.error('Error writing component file:', error);
  //   }
  // }
}