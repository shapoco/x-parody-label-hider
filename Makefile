.PHONY: test deploy

TEST_PORT = 9997

JS_NAME = x-parody-label-hider.user.js

SRC_DIR = src
DIST_DIR = dist

deploy:
	./bin/increment_revision.py -f "$(SRC_DIR)/$(JS_NAME)"
	mkdir -p dist
	cp -f "$(SRC_DIR)/$(JS_NAME)" "$(DIST_DIR)/."
	sed -i "$(DIST_DIR)/$(JS_NAME)" -e "s#http://localhost:$(TEST_PORT)/#https://github.com/shapoco/x-parody-label-hider/raw/refs/heads/main/dist/#g"

	git status
	#git add .
	#git commit -m "deploy"
	#git push

test:
	python3 -m http.server -d "$(SRC_DIR)" "$(TEST_PORT)"
