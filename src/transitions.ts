/** View-transition names that pair a project's card on the index with its hero on the detail page. */
export function projectTransitions(id: string) {
  return { container: `project-${id}`, blob: `project-${id}-blob` };
}
