
const autoText = (val) => {

    // const x = () => {

    let x = val


    let v = ''


    const output = async () => {
        for (const i of x) {
            const y = await forWait(i);
            // this.text += y;
            v += y;

        }
    }

    let forWait = (i) =>
        new Promise(resolve => {
            setTimeout(() =>
                resolve(i)
                , 50);
        })

    output();

    return v

    // }

}


export { autoText }