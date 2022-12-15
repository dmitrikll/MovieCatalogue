import './spinner'
import {filmer} from './films';
import './pagination';



console.log('hidden')
filmer().then(function() {
    console.log('display');
});