// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
import { JsonOptions } from "vite";

figma.showUI(__html__, { width: 460, height: 640 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// const subFigma = (height: number) => {
  

// }

function getDescription(node: SceneNode): string{
  const returnString: string[] = []

  returnString.push(`Type: ${node.type}`)
  returnString.push(`Name: ${node.name}`)
  returnString.push(`Visible: ${node.visible}`)
  if ('opacity' in node) {
    returnString.push(`Opacity: ${node.opacity}`)
  }

  if ('characters' in node && node.characters) {
    returnString.push(`Text: "${node.characters}"`)
  }
  if ('fontSize' in node && typeof node.fontSize === 'number') {
    returnString.push(`FontSize: ${node.fontSize}`)
  }
  if ('fills' in node && Array.isArray(node.fills)) {
    const solidFill = (node.fills as Paint[]).find(f => f.type === 'SOLID') as SolidPaint | undefined
    if (solidFill) {
      const { r, g, b } = solidFill.color
      returnString.push(`Fill: rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`)
    }
  }
  if ('cornerRadius' in node && typeof node.cornerRadius === 'number') {
    returnString.push(`CornerRadius: ${node.cornerRadius}`)
  }
  if ('effects' in node && Array.isArray(node.effects) && node.effects.length > 0) {
    const effectTypes = node.effects.map(e => e.type).join(", ")
    returnString.push(`Effects: ${effectTypes}`)
  }
  if ('layoutMode' in node) {
    returnString.push(`Layout: ${node.layoutMode}`)
  }
  if ('reactions' in node && node.reactions.length > 0) {
    returnString.push(`Interactions: ${node.reactions.length}`)
  }
  if ('parent' in node){
    returnString.push(`Parent Name: ${node.parent?.name}`)
  }

  return returnString.join(", ");
}
class subFigma {
  height: number;
  width: number;
  description: string;

  constructor(height: number, width: number, description: string){
    this.height = height;
    this.width = width;
    this.description = description;
  }

  toJSON(){
    return { height: this.height, width: this.width, description: this.description }
  }
  

}


figma.ui.onmessage =  (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-shapes') {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.count;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 0, g: 1, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  if (msg.type === 'collect'){
    const selected = figma.currentPage.children;
    

    const nodes: string[] = [];
    const queue: SceneNode[] = [];
    for (const children of selected){
      queue.push(children)
    }
    while (queue.length > 0){
      const node = queue.shift()!;
      nodes.push(JSON.stringify(new subFigma(node.height, node.width, getDescription(node))))
      if ('children' in node){
        for (const children of node.children){
          queue.push(children);
        }
      }
    }
    return nodes

  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};


