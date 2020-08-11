'use strict';
class Dropdowns
{
	constructor(DD_Names)
	{
		this.DD_Names = DD_Names;
	}

	getColNumber(name)
	{
		for(let c = 0; c < this.DD_Names.length;c++)
		{
			if(this.DD_Names[c] == name)
			{
				return c+1;
			}
		}
		return 0;
    }
    
   
	makeJsonOneColumn(columnData)
	{
		let rec = { };
		for(let r=0; r < columnData.length; r++ )
		{
			rec[this.DD_Names[r]] = columnData[r];
		}
		return rec;
	}
	makeJson(datamx,start=0)
	{
		let ret=[];
		for(let row = start; row < datamx.length; row++)
		{
			ret.push(this.makeJsonOneRow(datamx[row]) );
		}
		return ret;
	}
	
	getColLabel(name)
	{
		return col_number_to_label(this.getColNumber(name));
	}

	getLastColLabel()
	{
		return col_number_to_label(this.DD_Names.length);
	}
	jsonToRow(rec)
	{
		let row = []
		for(let c = 0; c < this.DD_Names.length;c++)
		{
			if(typeof rec[this.DD_Names[c]] !== 'undefined')
			{
				row.push(rec[this.DD_Names[c]] );
			}
			else
			{
				row.push('');	
			}
		}
		return row;
	}

};

export function col_number_to_label(num)
{
	var str='';
	//num--; //0 is not A; 1 is A
	while(num > 0)
	{
		let rem = (num-1) % 26;
		num = Math.floor((num-1)/26);
		str = String.fromCharCode(65+rem) + str;
	}
	return str;
}

export default ColumnNames;