gen:
	npx parcel public/robot.html


test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage


clean:
	rm -rf .parcel-cache
	rm -f dist/*


