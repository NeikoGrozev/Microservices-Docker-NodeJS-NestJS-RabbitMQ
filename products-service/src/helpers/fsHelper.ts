import { readFile, writeFile, access, rm } from 'node:fs/promises';

const initializeDB = async (filePath: string) => {
    try {
        await access(filePath);
    } catch (err: any) {
        await writeFile(filePath, JSON.stringify([]), 'utf8');
        console.log('The file was created successfully with this path!');
    }
};

export const addData = async (filePath: string, newData: any) => {
    try {
        initializeDB(filePath);
        const data = await getData(filePath);
        data.push(newData);
        await writeFile(filePath, JSON.stringify(data));
    } catch (err: any) {
        console.error('Error adding data:', err.message);
    }
};

export const getData = async (filePath: string) => {
    try {
        const fileContent = await readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (err: any) {
        console.error('Error reading file:', err.message);
        return [];
    }
};

export const updateData = async (filePath: string, newData: any) => {
    try {
        await writeFile(filePath, JSON.stringify(newData));
    } catch (err: any) {
        console.error('Error update data:', err.message);
    }
};

export const deleteFile = async (filePath: string) => {
    try {
        await rm(filePath);
    } catch (err: any) {
        console.error('The file is not deleted:', err.message);
    }
};
