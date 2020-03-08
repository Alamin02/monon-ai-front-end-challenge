const attendanceCols = [
    {
        title: 'Enter',
        dataIndex: 'start_time_formatted'
    },
    {
        title: 'Exit',
        dataIndex: 'end_time_formatted',
    },
    {
        title: 'Duration',
        dataIndex: 'duration_formatted',
        sorter: {
            compare: (a, b) => a.duration - b.duration,
            multiple: 1,
        }
    }
]

export default attendanceCols;