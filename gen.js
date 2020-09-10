const fs = require('fs');
const raw = fs.readFileSync('dim.json');
const json = JSON.parse(raw);

// Distinguish duplicates
const distDupl = json.map(p => {
    // Find someone that has different NIM, same jur-ang, and same nickname. If exists, it's not unique.
    const nicknameNotUniqueInAngkatan = json.find(s => s.nim !== p.nim && s.nim.substring(0, 5) === p.nim.substring(0, 5) && s.nickname === p.nickname);
    const nicknameUnique = !nicknameNotUniqueInAngkatan;
    return {...p, nicknameUnique };
})

const options = distDupl.map(p => {
    const angkatan = p.nim.substring(3, 5);
    const jurusan = p.nim.substring(0, 3) === '135' ? 'IF' : 'STI';

    return {
        value: p.nim,
        label: ((p.nickname && p.nicknameUnique) ? p.nickname : p.name) + ` (${jurusan} '${angkatan})`,
        name: p.name,
        nickname: p.nickname
    };
})

fs.writeFileSync("mhs.json", JSON.stringify(options));