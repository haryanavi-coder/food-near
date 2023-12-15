import express from "express"
import axios from "axios"
import cors from "cors"
const app = express();
const PORT = 3000;

// Add middleware to parse JSON in the request body
app.use(express.json());
app.use(cors());


// Define a sample endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello, this is your API endpoint!' });
});

// Outlet API endpoint
// Update the API endpoint to return the outletName
app.post('/api/get-outlet', async (req, res) => {
    const { address } = req.body;
  
    try {
      const outletName = await determineOutletName(address);
  
      if (outletName) {
        res.json({ outletName });
      } else {
        res.status(404).json({ message: 'Outlet not found' });
      }
    } catch (error) {
      console.error('Error determining outlet:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Function to determine the outlet based on the address using OpenStreetMap Nominatim API
async function determineOutletName(address) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: address,
      },
    });

    const results = response.data;
    console.log(results);

    if (results.length > 0) {
        const restaurant = results.find(result => result.type === 'restaurant');

        if (restaurant) {
          console.log(`Outlet Name: ${restaurant.name}`);
          return restaurant.name;
        } else {
          console.log('No restaurant found in the results.');
          return null;
        }
    }


    return null;
  } catch (error) {
    console.error('Nominatim API Error:', error.message);
    return null;
  }
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


