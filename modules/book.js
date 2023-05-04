export default class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  createNode() {
    const Node = document.createElement('li');
    const btn = document.createElement('button');

    btn.textContent = 'Remove';
    Node.innerHTML = `
      <span>${this.title} by ${this.author}</span>
    `;
    Node.appendChild(btn);

    return { Node, btn, index: this.index };
  }
}