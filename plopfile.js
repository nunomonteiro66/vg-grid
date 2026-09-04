export default function (plop) {
  plop.setGenerator("component", {
    description: "Create a new React component with a colocated test",
    prompts: [
      {
        type: "list",
        name: "location",
        message: "Where should the component live?",
        choices: [
          {
            name: "Game-guess UI primitive (app/game-guess/_components/ui)",
            value: "app/game-guess/_components/ui",
          },
          {
            name: "Game-guess feature component (app/game-guess/_components)",
            value: "app/game-guess/_components",
          },
          {
            name: "Shared component (components)",
            value: "components",
          },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{location}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "{{location}}/{{pascalCase name}}.test.tsx",
        templateFile: "plop-templates/component.test.tsx.hbs",
      },
    ],
  });
}
