export const orderColumns = (enhanced: boolean) => {
    return [
        { name: "Id", selector: "id", sortable: true },
        { name: "Name", selector: "name", sortable: true },
        { name: "Date", selector: "date", sortable: true },
        { name: "Address", selector: "address", sortable: true, },
        { name: "Country", selector: "country", sortable: true, grow: true  },
        { name: "Total", selector: "total", sortable: true, omit: !enhanced },
        { name: "Status", selector: "status", sortable: true },
    ]
}

