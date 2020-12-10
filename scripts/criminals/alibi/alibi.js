export const AlibiHTMLConverter = (alibiObject) => {
    return `
    <div class="associate">
        <div class="associate_name">Name: ${alibiObject.name}</div>
        <div class="associate_alibi">Alibi: ${alibiObject.alibi}</div>
    </div>
    `
}