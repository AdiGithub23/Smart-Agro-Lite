const csv = require('csv-parser');
const { District, Division, GsDivision, Image } = require('../models');
const { Readable } = require('stream');

exports.uploadDistricts = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    const districts = [];
    
    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (data) => {
        const { districtName } = data;
        if (districtName && !districts.includes(districtName)) {
          districts.push(districtName);
        }
      })
      .on('end', async () => {
        await Promise.all(districts.map(name =>
          District.findOrCreate({ where: { name } })
        ));

        return res.status(200).json({ message: 'Districts uploaded successfully!' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing the CSV.' });
  }
};

exports.uploadDivisions = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    const divisions = [];

    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (data) => {
        const { divisionName, districtId } = data;
        
        if (!divisionName || !districtId) {
          console.warn(`Missing divisionName or districtId in data: ${JSON.stringify(data)}`);
          return;
        }

        divisions.push({ name: divisionName.trim(), districtId: districtId.trim() });
      })
      .on('end', async () => {
        try {
          await Promise.all(divisions.map(async ({ name, districtId }) => {
            await Division.findOrCreate({
              where: { name: name, districtId: districtId },
            });
          }));

          return res.status(200).json({ message: 'Divisions uploaded successfully!' });
        } catch (dbError) {
          console.error('Database error:', dbError);
          return res.status(500).json({ message: 'An error occurred while saving divisions.' });
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        return res.status(500).json({ message: 'An error occurred while processing the CSV.' });
      });
  } catch (error) {
    console.error('General error:', error);
    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

exports.uploadGSDivisions = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    const gsDivisions = [];

    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (data) => {
        const { gsDivisionName, divisionName } = data;
        gsDivisions.push({ name: gsDivisionName, division: divisionName });
      })
      .on('end', async () => {
        const divisionIdMap = {};
        const divisions = await Division.findAll();
        divisions.forEach(division => {
          divisionIdMap[division.name] = division.id;
        });

        await Promise.all(gsDivisions.map(({ name, division }) =>
          GsDivision.findOrCreate({ where: { name, divisionId: divisionIdMap[division] } })
        ));

        return res.status(200).json({ message: 'GS Divisions uploaded successfully!' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing the CSV.' });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Please upload a CSV file.' });
    }

    const images = [];

    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (data) => {
        const { imageUrl, gsDivisionName } = data;
        images.push({ url: imageUrl, gsDivision: gsDivisionName });
      })
      .on('end', async () => {
        const gsDivisionIdMap = {};
        const gsDivisions = await GsDivision.findAll();
        gsDivisions.forEach(gsDivision => {
          gsDivisionIdMap[gsDivision.name] = gsDivision.id;
        });

        await Promise.all(images.map(({ url, gsDivision }) =>
          Image.findOrCreate({ where: { url, gsDivisionId: gsDivisionIdMap[gsDivision] } })
        ));

        return res.status(200).json({ message: 'Images uploaded successfully!' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing the CSV.' });
  }
};




exports.viewDistricts = async (req, res) => {
  try {
    const districts = await District.findAll();

    if (districts.length === 0) {
      return res.status(404).json({ message: 'No districts found.' });
    }

    return res.status(200).json(districts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching districts.' });
  }
};