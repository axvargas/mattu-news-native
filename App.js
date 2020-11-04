import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';
import { getNewsAPI } from './src/api/news'
import { map } from 'lodash'
import New from './src/components/New';
const App = () => {
	const [news, setNews] = useState(null)
	useEffect(() => {
		const getNews = async () => {
			const apiNews = await getNewsAPI()
			setNews(apiNews)
		}
		getNews()
	}, [])
	return (
		<>
			<StatusBar barStyle="light-content" />
			<SafeAreaView>
				<Text style={styles.title}>Last news</Text>
				<ScrollView contentContainerStyle={styles.scroll}>
					{news ?
						<>
							{map(news, (data) => (
								<New key={data.id} data={data} />
							))}
						</>
						:
						<Text>No news</Text>
					}

				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25,
		paddingVertical: 10
	},
	scroll: {
		flexGrow: 1
	}
});

export default App;
