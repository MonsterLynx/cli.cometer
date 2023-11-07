# cli.cometer

CLI that formats your commit message.

## Usage

1. type `cometer`
```bash
$ cometer
```

2. a select appears with type of commit
```bash
$ - feat
$ - fix
$ - etc...
```

3. after select, text input appears
```bash
$ - type in commit message
$ I did an awesome job
```

4. commit is created with the following format:
```bash
$ {feat | fix | etc... }: {commit message} [{story id}]
