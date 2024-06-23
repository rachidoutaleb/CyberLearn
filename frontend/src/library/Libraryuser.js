import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';

const Library = () => {
    const [searchInput, setSearchInput] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085/books');
                setBooks(response.data);
                setAllBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        filterBooks(e.target.value, categorySelect);
    };

    const handleCategorySelect = (e) => {
        setCategorySelect(e.target.value);
        filterBooks(searchInput, e.target.value);
    };

    const filterBooks = (searchText, category) => {
        const filteredBooks = allBooks.filter(book => {
            const title = book.title.toLowerCase();
            const bookCategory = book.category.toLowerCase();

            return title.includes(searchText.toLowerCase()) &&
                   (category === '' || bookCategory === category.toLowerCase());
        });

        setBooks(filteredBooks);
    };

    return (
        <Grid container spacing={2}style={{ marginBottom: '20px',marginTop:'10px' }}>
            <Grid item xs={12} style={{ marginBottom: '20px',marginTop:'5px' }}>
                <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',marginLeft: '50px' }}>
                    <Typography variant="h2" align="center" style={{ marginBottom: '20px', color: '#4a70ea', fontWeight: 'bold' }}>
                        Library
                    </Typography>
                    <div className="row mb-3">
                        <div className="col">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search"
                                style={{ width: '100%' }}
                                value={searchInput}
                                onChange={handleSearchInput}
                            />
                        </div>
                        <div className="col"style={{marginBottom:'0px'}} >
                            <select 
                                className="form-select"
                                style={{ width: '100%' }}
                                value={categorySelect}
                                onChange={handleCategorySelect}
                            >
                                <option value="">All Categories</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Embedded Systems">Embedded Systems</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Grid>

            {books.map(book => (
                <Grid item key={book.id} xs={12} style={{marginLeft: '70px',marginRight: '10px' , marginTop:'0px'}}>
                    <Box display="flex" p={2} border={1} borderColor="grey.300" borderRadius={4} bgcolor="background.paper">
                        <Box mr={2}>
                            <img src={`http://localhost:8091/images/${book.cover}`} alt={book.title} style={{ width: 150, height: 'auto' }} />
                        </Box>
                        <Box>
                        <Typography variant="h5" style={{ fontWeight: 'bold', textAlign: 'left', wordSpacing: '-3px' }}>
                        {book.title}
                        </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Author: {book.author}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Category: {book.category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Date: {book.date.toString().substring(0, 10)}
                            </Typography>
                            <Typography variant="body2" component="p" >
                                Description: {book.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default Library;
