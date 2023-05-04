const users = [{
        id: 1,
        firstName: 'Alan',
        lastName: 'Po',
        email: "hello@world.by",
        blog: [1, 2, 3, 4],
        password: '$2b$12$Z0ks/QX5g61ak5EMtzvFMe33FoW7LePHvyAHciYJOfXu/AfZSuZdi'
    },
    {
        id: 2,
        firstName: 'Adam',
        lastName: 'Single',
        email: "hello1@world.by",
        blog: [10, 20, 30, 40],
        password: '$2b$12$d1O/xUY2CUoIQq5dok.M2.RBb1J3twhhZT9w3QHGuwZKqppFV0bu2'
    },
    {
        id: 3,
        firstName: 'Ben',
        lastName: 'Gur',
        email: "hello2@world.by",
        blog: [11, 21, 31, 41],
        password: '$2b$12$7OxVbawtW/Tlv29U5pMuT.TjSIPEbwWqDmAo2DBdxiPZo4U3YV/k6'
    },
    {
        id: 4,
        firstName: 'Sam',
        lastName: 'Smit',
        email: "hello3@world.by",
        blog: [12, 22, 32, 42],
        password: '$2b$12$xB6fA2bngd/XGmjgFroEHuy1EAG6D1Sdm1lMjNYygnjGahxzwGPoq'
    },
];

const findOne = async (obj) => {
    return Promise.resolve(users.find(u => u.email === obj.email));
};

const findById = async (id) => {
    return Promise.resolve(users.find(u => u.id === id));
}

const save = async (obj) => {
    obj.id = users.length + 1;
    users.push(obj);
    return Promise.resolve(obj);
}

const getAll = () => {
    return Promise.resolve(users);
}


module.exports = {
    findOne,
    findById,
    save,
    getAll
};