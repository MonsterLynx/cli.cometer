import select from '@inquirer/select'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'

import { GitProcessor } from "./GitProcessor"

export class Cli {
  constructor(private git = new GitProcessor()) {
  }

  async run() {
    const prefix = await select({
      message: 'Type of commit',
      choices: [
        {
          name: 'feat',
          value: 'feat',
          description: 'Feature'
        },
        {
          name: 'fix',
          value: 'fix',
          description: 'Fix'
        }
      ]
    })

    const message = await input({
      message: 'Type in commit message'
    })

    const task = await new GitProcessor().taskId()
    const branch = await new GitProcessor().current()

    const result = `${prefix}: ${message} [${task}]`

    const confirmCommit = await confirm({
      message: `You are about to commit "${result}" to branch "${branch}". Confirm?`
    })

    if (confirmCommit) {
      await new GitProcessor().commit(result)

      console.log('Commit Successful!')
    }

  }
}
