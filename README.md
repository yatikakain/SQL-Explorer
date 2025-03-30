# SQL Query Editor

![{E443E084-619B-41F6-B089-972CD8B7206D}](https://github.com/user-attachments/assets/d880118d-026b-486e-b37a-398a4ea2b55f)


A modern web-based SQL editor with query management, result visualization, and performance optimization features.

## Features

- 📝 CodeMirror-based SQL editor with syntax highlighting
- 🌓 Dark/Light theme toggle with localStorage persistence
- 📚 Query history tracking (last 10 executions)
- 📥 CSV export with proper escaping
- 🔍 Real-time search across results
- 📊 Paginated results display
- ⚡ Optimized for performance

## Built With

**Framework & Libraries**
- [React 19](https://react.dev/) - Core framework
- [CodeMirror 6](https://codemirror.net/) - SQL editor component
- [styled-components](https://styled-components.com/) - CSS-in-JS styling
- [Lucide React](https://lucide.dev/) - Icon library
- [React Icons](https://react-icons.github.io/react-icons/) - Additional icons
- [lodash.debounce](https://lodash.com/) - Input debouncing

**Key Packages**
- `@uiw/react-codemirror`: Code editor integration
- `react-toastify`: Notification system
- `lucide-react`: Modern icon set
- `react-icons`: Extended icon collection

## Performance
![WhatsApp Image 2025-03-31 at 00 08 42_6e04764e](https://github.com/user-attachments/assets/1add686b-fe3b-4237-8a59-efa64e42b184)

**Page Load Metrics**
- Initial Load Time: <2 seconds (production build)
- Lighthouse Score: 100/100 (damnn)

Measured using:
1. Chrome DevTools Lighthouse audit
2. Web Vitals integration
3. Production build analysis (`npm run build`)

## Optimizations Implemented

**Core Performance Enhancements**
- 🚀 Code splitting with `React.lazy` for modals
- 📦 Memoization of components (`React.memo`, `useMemo`)
- ⏳ Debounced search inputs (300ms delay)
- 📑 Virtualized table rendering via pagination
- 🔄 Efficient state management with `useCallback`
- 🗜️ Brotli compression for static assets
- 🎨 CSS containment for complex components

**Advanced Techniques**
- Critical CSS inlining
- Preconnect to external resources
- Font display swapping
- Memory-efficient CSV generation
- Query history size limiting
- Cleanup effects for event listeners

## Installation

1. Clone repository
   ```bash
   git clone https://github.com/yatikakain/SQL-Explorer.git
   ```
2. Install dependencies
   ```bash
    npm install
   ```
3. Start development server
      ```bash
    npm start
    ```

## Usage
1. Write or paste SQL query in the editor
2. Click "Run Query" to execute
3. Use search bar to filter results
4. Access history via clock icon
5. Toggle theme with sun/moon buttons
6. Export results as CSV

## Architecture Highlights
![WhatsApp Image 2025-03-31 at 02 21 02_28d41fda](https://github.com/user-attachments/assets/d6ddb506-0f78-4aba-9fe8-2978d73cfa0e)
![WhatsApp Image 2025-03-31 at 02 21 18_12a55559](https://github.com/user-attachments/assets/1a33fa12-2244-4ad3-ba1e-cc6b1e623df3)

## Contribution Guidelines
- Follow existing code style and architecture
- Write clear commit messages
- Include relevant tests for new features
- Update documentation when adding new features
- Keep PRs focused on single improvements
