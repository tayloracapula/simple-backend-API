import  fs  from "fs";
import path from "path";

console.log(`
   ╭────────────╮
   |  ◕ ◡ ◕    |  
   |  ╭───╮     |   Bun says BYE BYE DataBase
   |  ╰───╯     |   I'LL MISS YOU!
   ╰────────────╯
`);

const dbDir = path.join(process.cwd(), 'db');

if (fs.existsSync(dbDir)) {
    const files = fs.readdirSync(dbDir);
    for (const file of files) {
        if (file.endsWith('.sqlite') || 
            file.endsWith('.sqlite-journal') ||
            file.endsWith('.sqlite-shm') ||
            file.endsWith('.sqlite-wal')) {
        fs.unlinkSync(path.join(dbDir, file));
        }
    }

    fs.rmdirSync(dbDir,{recursive:true})
}

fs.mkdirSync(dbDir,{recursive:true});