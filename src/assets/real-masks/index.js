
const files = import.meta.glob("@assets/real-masks/*.png", {
    query: '?url',
    import: 'default',
});

const MASKS = await Promise.all(
    Object.entries(files)
        .map(async ([key, load]) => {

            const name = key.match(/\/([^\/]*\.png)$/)?.at(1);

            return [name, await load()];
        })
);

export default Object.fromEntries(MASKS);