class createNode
	constructor: (wrapper, template) ->
		@storage = {}
		@el = @parseQuery wrapper
		@renderTemplate template, @el

	renderTemplate: (template, parentNode) ->
		commands = template.split /(\+|\>|\^)/
		currentNode = null

		for command in commands
			switch command
				when '+'
					no
				when '>'
					parentNode = currentNode
				when '^'
					parentNode = parentNode.parentNode
				else
					[query, save] = command.split '$'
					currentNode = @parseQuery query
					@storage[save] = currentNode
					parentNode.appendChild currentNode

	parseQuery: (query) ->
		tokens = query.split /(?=\.)|(?=#)|(?=\[)/
		elem =
			tag: 'div'
			id: null
			classes: []
			attrs: []

		parseAttr = (token) ->
			attr = token[1...-1].split '='

			attr[0] = do attr[0].trim
			attr[1] = do attr[1].trim

			attr[1] = attr[1].replace /"/g, ''

			return attr

		for token in tokens
			switch token[0]
				when '#'
					elem.id = token[1..]
				when '.'
					elem.classes.push token[1..]
				when '['
					elem.attrs.push parseAttr token
				else
					elem.tag = token

		node = document.createElement elem.tag

		if elem.id
			node.id = elem.id

		for c in elem.classes
			node.classList.add c

		for attr in elem.attrs
			node.setAttribute attr[0], attr[1]

		return node