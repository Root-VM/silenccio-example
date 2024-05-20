export const exportFooterGeneration = (data: {footer_one: string, footer_two: string}) => {
    return `<html><head><style> 
body {
    max-width: 732px;
    margin: 0 auto;
}
* { font-family: "Source Sans 3", sans-serif;
    box-sizing: border-box;
    color: #333;
} 
footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
footer p {
    font-size: 12px;
}</style></head><body>
<footer>
<p>Silenccio AG, Weinbergstrasse 111, 8006 Zürich</p> 
<p>${data.footer_one} <span class=\"pageNumber\"></span> ${data.footer_two} <span class=\"totalPages\"></span></p>
</footer>

</body></html>
`
}
