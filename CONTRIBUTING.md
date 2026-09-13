# Contributing to BreakTracker-Pro

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/BreakTracker-Pro.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make changes and test
5. Commit: `git commit -m 'Add feature description'`
6. Push: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Coding Standards

### JavaScript/React
- Use ES6+ syntax
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Indent with 2 spaces

### Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use PropTypes or TypeScript for type checking

### CSS
- Use Tailwind CSS utility classes
- Avoid inline styles
- Keep responsive design in mind
- Mobile-first approach

## Git Workflow

### Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`

### Commit Messages
```
<type>: <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat: Add dark mode support

Implement dark mode toggle in settings page
using CSS custom properties for theming

Closes #123
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update README if needed
5. Describe changes clearly in PR
6. Request review from maintainers
7. Address feedback promptly

## Testing

```bash
# Run tests
npm test

# Run specific test
npm test -- specific.test.js

# Coverage
npm test -- --coverage
```

## Building

```bash
# Build frontend
cd client && npm run build

# Build backend
npm run build
```

## Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update SETUP.md for new setup steps
- Add examples for new features

## Issues

### Reporting Bugs
1. Use issue template
2. Provide minimal reproducible example
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details

### Suggesting Features
1. Check existing issues
2. Provide clear description
3. Explain use case
4. Suggest implementation (if possible)

## Development Tips

1. Use React DevTools extension
2. Use Redux DevTools for state
3. Use Postman for API testing
4. Enable debug logging

## Performance Considerations

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Implement code splitting
- Optimize database queries
- Use caching appropriately

## Security Considerations

- Validate all inputs
- Never commit secrets
- Use parameterized queries
- Implement proper authentication
- Follow OWASP guidelines

## Areas for Contribution

### Easy (Good for beginners)
- Documentation improvements
- Bug fixes
- UI enhancements
- Add tests

### Intermediate
- New features
- Refactoring
- Performance optimization
- Database optimization

### Advanced
- Architecture improvements
- Complex features
- DevOps/deployment
- Security enhancements

## Getting Help

- GitHub Issues
- GitHub Discussions
- Email: sainathsabale03@gmail.com
- Check existing documentation

## License

By contributing, you agree your contributions will be licensed under the MIT License.

---

**Thank you for contributing to BreakTracker-Pro!** 🎉
