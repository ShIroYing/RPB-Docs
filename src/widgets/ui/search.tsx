'use client'

import { stopwords as englishStopwords } from '@orama/stopwords/english'
import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { staticClient } from 'fumadocs-core/search/client/orama-static'
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	type SharedProps
} from 'fumadocs-ui/components/dialog/search'
import { create } from 'zbsearch'

const initDB = (_loc?: string) =>
	create({
		schema: { _: 'string' },
		components: {
			tokenizer: createTokenizer({
				language: 'mandarin',
				stopWords: [...mandarinStopwords, ...englishStopwords],
				stemmer: word => word.toLowerCase()
			})
		}
	})

export default (props: SharedProps) => {
	const { search, setSearch, query } = useDocsSearch({
		client: staticClient({ from: '/search-data.json', initDB })
	})
	return (
		<SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList items={query.data !== 'empty' ? query.data : null} />
			</SearchDialogContent>
		</SearchDialog>
	)
}