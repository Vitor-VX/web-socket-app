const fs = require('fs/promises');

const fileName = 'users.json';

const getData = () => {
    return Date().toString();
}

const readFileAsArray = async () => {
    try {
        const file = await fs.readFile(fileName, 'utf-8');
        return JSON.parse(file);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

const writeArrayToFile = async (array) => {
    try {
        const formattedJson = JSON.stringify(array, null, 2);
        await fs.writeFile(fileName, `\n${formattedJson}\n`.trim());
    } catch (err) {
        console.error(`Error writing to file ${fileName}: ${err}`);
    }
}

const writeClear = async () => {
    try {
        await fs.writeFile(fileName, '[]'.trim());
    } catch (err) {
        console.error(`Error writing to file ${fileName}: ${err}`);
    }
}

const PickUpLastElement = async () => {
    const file = await fs.readFile(fileName);

    const array = JSON.parse(file.toString());

    array.forEach((item, index) => {
    });
}

const checkFileExists = async () => {
    try {
        await fs.access(fileName);

        return true;
    } catch (err) {
        if (err.code == 'ENOENT') {
            return false;
        }

        console.log(`Error checkFileExist`);

        return false;
    }
}

const UserAdd = async (id) => {
    const jsonData = {
        userId: id,
        date: getData()

    }

    const formattedJson = JSON.stringify(jsonData, null, 2);
    const fileExists = await checkFileExists();

    if (!fileExists) {
        try {
            await fs.writeFile(fileName, `[\n${formattedJson}\n]`);

            console.log(`File created.`);
        } catch (err) {
            console.log(`Error created file users.json`);
        }

        return;
    }

    try {
        const array = await readFileAsArray();
        array.push(jsonData);

        await writeArrayToFile(array);
    } catch (err) {
        console.error(`Error appending data to file ${fileName}: ${err}`);
    }
}

const UserDelete = async (id) => {
    try {
        const array = await readFileAsArray();
        const indexToRemove = array.findIndex(item => item.userId === id);

        if (indexToRemove === -1) return;

        array.splice(indexToRemove, 1);

        await writeArrayToFile(array);
    } catch (err) {
        console.error(`Error appending data to file ${fileName}: ${err}`);
    }
}

const GetAllUsersOn = async () => {
    try {
        const array = await readFileAsArray();

        return array.length
    } catch (err) {
        console.error(`Error getAllUsersOn: ${err}`);

        return -1;
    }
}

module.exports = {
    UserAdd,
    UserDelete,
    GetAllUsersOn,
    writeClear
}