install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8	
publish:
	npm publish --dry-run
.PHONY: test	
