const cluster = require('cluster');

if(cluster.isMaster) {
	var numWorkers = require('os').cpus().length;
	var workers = [];

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
		worker = cluster.fork()
		workers.push(worker);
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		console.log('Starting a new worker');
		var crushedWorkerIndex = workers.findIndex((w) => w.process.pid === worker.process.pid);
		workers.splice(crushedWorkerIndex, 1);
		newWorker = cluster.fork()
		workers.push(newWorker);
	});


} else {
	require('./server');
}
