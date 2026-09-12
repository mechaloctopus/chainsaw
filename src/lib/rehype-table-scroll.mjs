/**
 * Wraps every Markdown table in a keyboard-reachable, horizontally scrollable
 * region. Tables are the one thing on this site allowed to scroll sideways;
 * the page body never is.
 */
export function rehypeTableScroll() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'table') {
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll'],
              tabIndex: 0,
              role: 'group',
              'aria-label': 'Table, scrolls sideways',
            },
            children: [child],
          };
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}
