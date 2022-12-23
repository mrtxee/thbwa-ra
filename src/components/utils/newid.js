let lastId = 1000;

export default function(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}