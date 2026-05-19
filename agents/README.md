# agents/

Contexto y reglas para agentes de IA que trabajen en este proyecto.
Aplica a cualquier herramienta: Claude Code, Cursor, GitHub Copilot, Gemini, etc.

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `context.md` | Descripción del proyecto, stack y ambiente de desarrollo |
| `conventions.md` | Reglas de código, CSS, JS y Liquid específicas de este repo |
| `workflows.md` | Flujos de trabajo comunes: agregar sección, debug, deploy |

## Cómo usar en cada herramienta

**Claude Code** — ya cargado via `AGENTS.md` en la raíz (que referencia esta carpeta).

**Cursor** — agrega en `.cursorrules`:
```
@agents/context.md
@agents/conventions.md
```

**GitHub Copilot** — agrega en `.github/copilot-instructions.md`:
```markdown
<!-- context -->
[pega el contenido de agents/context.md]
```

**Gemini CLI / otros** — pasa los archivos como contexto al iniciar la sesión.
