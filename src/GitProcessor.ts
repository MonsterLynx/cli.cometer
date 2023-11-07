import { exec } from 'child_process'

export class GitProcessor {
  current(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        if (err) {
          reject(err)
        }

        resolve(stdout.trim())
      })
    })
  }

  async taskId() {
    const currentBranch = await this.current()

    return currentBranch.match(/sc-\d+/g)
  }

  commit(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(`git commit -m "${message}"`, (err, stdout, stderr) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  }
}
