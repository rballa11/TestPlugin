// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
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
  if ('parent' in node && node.parent){
    returnString.push(`Parent Name: ${node.parent.name}`)
  }

  return returnString.join(", ");
}
class subFigma {
  height: number;
  width: number;
  desc: string;

  constructor(height: number, width: number, description: string){
    this.height = height;
    this.width = width;
    this.desc = description;
  }

  toJSON(){
    return { height: this.height, width: this.width, desc: this.desc }
  }
  

}


figma.ui.onmessage = (msg) => {
  if (msg.type === 'collect'){
    const selected = figma.currentPage.children;

    const nodes: subFigma[] = [];
    const queue: SceneNode[] = [];
    for (const children of selected){
      queue.push(children)
    }
    while (queue.length > 0){
      const node = queue.shift()!;
      nodes.push(new subFigma(node.height, node.width, getDescription(node)))
      if ('children' in node){
        for (const children of node.children){
          queue.push(children);
        }
      }
    }
    figma.ui.postMessage({type: 'descriptions', payload: {nodes}})
  }

  if (msg.type === 'cancel'){
    figma.closePlugin();
  }
};


