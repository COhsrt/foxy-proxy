class CurrentRound {

  constructor(upstream, miningInfo, eventEmitter, maxScanTime) {
    this.upstream = upstream;
    this.miningInfo = miningInfo;
    this.prio = (upstream && upstream.upstreamConfig.prio) || 10;
    this.maxScanTime = maxScanTime;
    this.eventEmitter = eventEmitter;
    this.scanDone = false;
  }

  start() {
    this.timeoutId = setTimeout(() => {
      this.scanDone = true;
      this.timeoutId = null;
      this.eventEmitter.emit('scan-done');
    }, this.maxScanTime * 1000);
  }

  cancel() {
    if (!this.timeoutId) {
      return;
    }
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }
}

module.exports = CurrentRound;