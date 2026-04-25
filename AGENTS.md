# Project Agent Instructions

- For file edits in this workspace, prefer direct PowerShell file rewrites over `apply_patch`.
- `apply_patch` has failed in this project when deleting or rewriting files, so use PowerShell commands such as `Set-Content` after reading the current file and confirming the intended scope.
- Keep edits narrowly scoped, preserve unrelated user changes, and verify with the relevant build/tests before reporting completion.
- This is a static Tailwind site. After HTML/CSS/JS changes, run `npm run build:css` and `node --test`.
