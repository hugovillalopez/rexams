export let latex_sym = [
  ["x^{a}", "x_{a}", "x_{a}^{b}", "{x_{a}}^{b}", "x_{a}^{b}\\textrm{c}", "\\frac{a}{b}",
    "\\frac{\\partial }{\\partial x}", "\\frac{\\partial^2 }{\\partial x^2}",
    "\\frac{\\mathrm{d} }{\\mathrm{d} x}", "\\int_{x}^{a}", "\\oint_{x}^{a}", "\\iint_{x}^{a}",
    "\\bigcap_{x}^{a}", "\\bigcup_{x}^{a}", "\\lim_{x}", "\\sum_{x}^{a}", "\\sqrt{x}", "\\sqrt[a]{x}",
    "\\prod_{x}^{a}", "\\coprod_{x}^{a}"],
  ["\\boldsymbol{\\alpha}", "\\mathbf{x}", "\\mathit{x}", "\\mathrm{x}", "\\mathfrak{x}", "\\mathbb{x}",
    "\\textup{x}", "\\textbf{x}", "\\textit{x}", "\\textrm{x}", "\\texttt{x}"]
  ,
  ["a\\,b", "a\\:b", "a\\;b", "a\\!b"]
  ,
  ["\\pm", "\\mp", "\\times", "\\ast", "\\div", "\\setminus", "\\dotplus", "\\amalg", "\\dagger", "\\ddagger",
    "\\wr", "\\diamond", "\\circledcirc", "\\circledast", "\\cap", "\\Cap", "\\sqcap", "\\wedge", "\\barwedge",
    "\\triangleleft", "\\lozenge", "\\circ", "\\square", "\\triangle", "\\triangledown", "\\ominus", "\\oslash",
    "\\circleddash", "\\cup", "\\Cup", "\\sqcup", "\\vee", "\\veebar", "\\triangleright", "\\blacklozenge",
    "\\bullet", "\\blacksquare", "\\blacktriangle", "\\blacktriangledown", "\\oplus", "\\otimes", "\\odot",
    "\\cdot", "\\uplus", "\\bigsqcup", "\\bigtriangleup", "\\bigtriangledown", "\\star", "\\bigstar",
    "\\bigcirc", "\\bigoplus", "\\bigotimes", "\\bigodot"]
  ,
  ["\\therefore", "\\because", "\\cdots", "\\ddots", "\\vdots", "\\S",
    "\\P", "\\copyright", "\\partial", "\\imath", "\\jmath", "\\Re", "\\Im", "\\forall",
    "\\exists", "\\top", "\\mathbb{P}", "\\mathbb{N}", "\\mathbb{Z}", "\\mathbb{I}", "\\mathbb{Q}",
    "\\mathbb{R}", "\\mathbb{C}", "\\angle", "\\measuredangle", "\\sphericalangle", "\\varnothing", "\\infty",
    "\\mho", "\\wp"]
  ,
  ["\\sqsubset", "\\sqsubseteq", "\\subset", "\\subseteq", "\\nsubseteq", "\\subseteqq", "\\nsubseteq", "\\in",
    "\\notin", "\\sqsupset", "\\sqsupseteq", "\\supset", "\\supseteq", "\\nsupseteq", "\\supseteqq",
    "\\nsupseteqq", "\\ni"]
  ,
  ["{a}'", "\\dot{a}", "\\hat{a}", "\\grave{a}", "\\tilde{a}", "\\bar{a}", "\\not{a}", "{a}''",
    "\\ddot{a}", "\\check{a}", "\\acute{a}", "\\breve{a}", "\\vec{a}", "a^{\\circ}", "\\widetilde{aa}",
    "\\widehat{aa}", "\\overleftarrow{aa}", "\\overrightarrow{aa}", "\\overline{aa}", "\\underline{aa}",
    "\\overbrace{aa}", "\\underbrace{aa}", "\\overset{b}{aa}", "\\underset{b}{aa}"]
  ,
  ["\\mapsto", "\\leftarrow", "\\Leftarrow", "\\leftrightarrow", "\\leftharpoonup", "\\leftharpoondown",
    "\\leftrightharpoons", "\\xleftarrow[]{}", "\\overset{}{\\leftarrow}", "\\underset{}{\\leftarrow}",
    "n \\to", "\\rightarrow", "\\Rightarrow", "\\Leftrightarrow", "\\rightharpoonup", "\\rightharpoondown",
    "\\rightleftharpoons", "\\xrightarrow[]{}", "\\overset{}{\\rightarrow}", "\\underset{}{\\rightarrow}"]
  ,
  ["\\left (  \\right )", "\\left [  \\right ]", "\\left \\{  \\right \\}", "\\left |  \\right |",
    "\\left \\{  \\right.", "\\left \\|  \\right \\|", "\\left \\langle  \\right \\rangle",
    "\\left \\lfloor  \\right \\rfloor", "\\left \\lceil  \\right \\rceil", "\\left.  \\right \\}"]
  ,
  ["\\alpha", "\\Alpha", "\\epsilon", "\\Epsilon", "\\theta", "\\Theta", "\\lambda", "\\Lambda", "\\pi", "\\Pi",
    "\\sigma", "\\Sigma", "\\phi", "\\Phi", "\\omega", "\\Omega", "\\beta", "\\Beta", "\\varepsilon",
    "\\vartheta", "\\mu", "\\Mu", "\\varpi", "\\varsigma", "\\varphi", "\\gamma", "\\Gamma", "\\zeta",
    "\\Zeta", "\\iota", "\\Iota", "\\nu", "\\Nu", "\\rho", "\\Rho", "\\tau", "\\Tau", "\\chi", "\\Chi",
    "\\delta", "\\Delta", "\\eta", "\\Eta", "\\kappa", "\\Kappa", "\\xi", "\\Xi", "\\varrho", "\\upsilon",
    "\\Upsilon", "\\psi", "\\Psi"]
  ,
  ["<", "\\leq", "\\leqslant", "\\nless", "\\nleqslant", "\\prec", "\\preceq", "\\ll", "\\vdash", "\\smile",
    "\\models", "\\mid", "\\bowtie", ">", "\\geq", "\\geqslant", "\\ngtr", "\\ngeqslant", "\\succ", "\\succeq",
    "\\gg", "\\dashv", "\\frown", "\\perp", "\\parallel", "\\Join", "=", "\\doteq", "\\equiv", "\\neq",
    "\\not\\equiv", "\\:=", "\\sim", "\\approx", "\\simeq", "\\cong", "\\asymp", "\\propto"]
]

export let math_categories = ['Scripts', 'Font style', 'Spacing', 'Shapes', 'Sets', 'Set operators', 'Accents',
  'Arrows', 'Separators', 'Greek letters', 'Binary relations'];

export let math_eq_icons = ['x_{a}^{b}', '\\mathit{x}', 'a\\,b', '\\blacklozenge', '\\mathbb{R}', '\\subseteq', '\\vec{a}',
  '\\Rightarrow', '\\left \\{  \\right \\}', '\\Omega', '\\leqslant'];
