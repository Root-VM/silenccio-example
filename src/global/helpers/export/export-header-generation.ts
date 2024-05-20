import moment from "moment/moment";

export const exportHeaderGeneration = async (data:{
    organisation_name: string,
    export_date: string
}) => {

    return `<html><head>
<style> 
body {
    max-width: 732px;
    margin: 0 auto;
}
* { font-family: "Source Sans 3", sans-serif;
    box-sizing: border-box;
    color: #333;
}
img{
height: 55px;
width: auto;
}
header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 40px;
}
header p{
    font-size: 12px;
    color: #333;
}
</style></head><body><header><img src=\"./img/logo.png\" alt=\"logo\" style=\"{height: 48px!important;width: 48px}\"><p>${data.organisation_name}, ${data.export_date.toLowerCase()} ${moment().format('DD.MM.YYYY HH:mm')}</p></header></body></html>`

}
