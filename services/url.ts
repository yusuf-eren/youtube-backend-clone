import shortid from 'shortid';

export const generateShortID = () => {
    return shortid.generate();
};

export const isValidID = (id: string) => {
    return shortid.isValid(id);
};
