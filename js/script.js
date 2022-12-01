// A web component that displays a project's details and a link to the project's GitHub repository and to  a live demo.
class Project extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['name', 'description', 'github', 'demo']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.name = newValue
    } else if (name === 'description') {
      this.description = newValue
    } else if (name === 'github') {
      this.github = newValue
    } else if (name === 'demo') {
      this.demo = newValue
    }
  }
}
