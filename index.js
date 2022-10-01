// Requiring the module
const http=require('http')


const reader = require('xlsx')
const file = reader.readFile('./1STCUS.xlsx')

let data = []

const sheets = file.SheetNames
console.log(sheets);
for(let i = 0; i < sheets.length; i++)
{
const temp = reader.utils.sheet_to_json(
		file.Sheets[file.SheetNames[i]])
temp.forEach((res) => {
	data.push(res)
})
}
//console.log(data)

sheets.forEach(sheet => {
    const sheet_data = reader.utils.sheet_to_json(file.Sheets['Profit & Loss'])
    sheet_data.map(person => {
        console.log(person);
    })
    sheet_data.forEach(res => {
        data.push(res)
    })
    const ws = reader.utils.json_to_sheet(data)

})
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify(data));
    res.end();
}).listen(4000)
