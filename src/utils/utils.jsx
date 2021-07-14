const MakeSlug = (str) => {
    return str?.trim()?.toLowerCase()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'-');   
}
const MakeScore = (str) => {
    return str?.trim()?.toLowerCase()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'_');   
}
const SameSlug = (str) => {
    return str?.trim()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'-');   
}

const GetString = (str, length) => {
    if(str){
        return str.substr(0,length);
    }else{
        return '';
    }
}
const GetName = (str) => {
    if(str){
        return str.replaceAll('-', ' ');   
    }else{
        return '';
    }
}

const getAllValue = (str) => {
    const data = str.split('-')
    return {
        id: data[0],
        value: MakeSlug(data[1]),
        value2: MakeSlug(data[2])
    }
}

const ObjectToCsv = async (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for(const row of data){
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
}

const downloadData = async (data,isbn) => {
    const blob = new Blob([data],{ type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden",'');
    a.setAttribute("href",url);
    a.setAttribute("download",`${isbn}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function formatAMPM(date) {
    console.log(date)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export {
    MakeSlug,
    MakeScore,
    SameSlug,
    GetString,
    GetName,
    getAllValue,
    ObjectToCsv,
    downloadData,
    formatAMPM
}
