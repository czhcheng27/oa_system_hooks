export const formulaArr = [
  `s\\tfrac{a}{b} `,
  "\\ -b \\pm \\sqrt{b^2-4ac} \\over 2a",
  `x_a+y^2`,
  `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`,
  "(x+a)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k a^{n-k} ",
  "x ={-b \\pm \\sqrt{b^2-4ac}\\over 2a} ",
];

export const tinymceInit4Formula = {
  toolbar_mode: "kityformula-editor",
  toolbar: "kityformula-editor",
  menubar: "false",
  plugins: "kityformula-editor",
  elementpath: false,
  content_style: `
    html, body {
    height: 100%;
      }
    html {
      display: table;
      margin: auto;
      }
    body {
      display: table-cell;
      vertical-align: middle;
      }
    `,
};
