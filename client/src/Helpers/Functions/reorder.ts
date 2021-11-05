const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const [removed] = list.splice(startIndex, 1)
    list.splice(endIndex, 0, removed)

    return list
}

export default reorder
