App = {
    contracts: {},
    loading: false,

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadSmartContract()
        await App.renderAccount()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0];
    },

    loadSmartContract: async () => {
        const ToDoList = await $.getJSON('ToDoList.json')
        App.contracts.ToDoList = TruffleContract(ToDoList)
        App.contracts.ToDoList.setProvider(App.web3Provider)

        App.ToDoList = await App.contracts.ToDoList.deployed()
    },

    renderAccount: async () => {
        if (App.loading) return
        App.setLoading(true)
        $('#account').html(App.account)
        await App.renderTasks()
        App.setLoading(false)
    },

    setLoading: (state) => {
        App.loading = state
        const loader = $('#loader')
        const content = $('#content')
        if (state) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },

    renderTasks: async () => {
        const taskCounter = await App.ToDoList.taskCounter()
        const $taskTemplate = $('.taskTemplate')

        for (var i = 1; i <= taskCounter; i++) {
            const currTask = await App.ToDoList.tasks(i)
            const taskID = currTask[0].toNumber()
            const taskTitle = currTask[1]
            const taskContent = currTask[2]
            const taskPriority = currTask[3]
            const taskCompleted = currTask[4]

            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.title').html(taskTitle)
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                .prop('name', taskID)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted)

            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }

            $newTaskTemplate.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})
